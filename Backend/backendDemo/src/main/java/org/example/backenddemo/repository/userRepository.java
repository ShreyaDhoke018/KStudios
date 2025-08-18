package org.example.backenddemo.repository;

import org.example.backenddemo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

public interface userRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByUsername(String username);
    Optional<Users> findByUsernameOrEmail(String username, String email);


    // Custom update query
    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.password = :password WHERE u.username = :username")
    int updatePasswordByUsername(@Param("password") String password, @Param("username") String username);


    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.email = :email WHERE u.username = :username")
    int updateEmailByUsername(@Param("email") String email, @Param("username") String username);

    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.phone = :phone WHERE u.username = :username")
    int updatePhoneByUsername(@Param("phone") String phone, @Param("username") String username);

    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.username = :newUsername WHERE u.username = :oldUsername")
    int updateUsernameByUsername(@Param("newUsername") String newUsername, @Param("oldUsername") String oldUsername);

    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.image = :imagePath WHERE u.username = :username")
    int updateImageByUsername(@Param("imagePath") String imagePath, @Param("username") String username);


}
